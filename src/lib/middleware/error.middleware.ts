import { NextRequest, NextResponse } from 'next/server';
import { AppError } from '../utils/errors';
import { errorResponse } from '../utils/response';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';

export type RouteHandler = (
  request: NextRequest,
  context?: any
) => Promise<NextResponse>;

// Wrap API route handlers with error handling
export function withErrorHandler(handler: RouteHandler): RouteHandler {
  return async (request: NextRequest, context?: any) => {
    try {
      return await handler(request, context);
    } catch (error) {
      return handleError(error, request);
    }
  };
}

// Central error handling function
function handleError(error: unknown, request: NextRequest): NextResponse {
  const method = request.method;
  const path = new URL(request.url).pathname;

  // Handle known AppError instances
  if (error instanceof AppError) {
    logger.warn(`AppError: ${error.message}`, {
      method,
      path,
      statusCode: error.statusCode,
    });
    
    return errorResponse(
      error.message,
      error.statusCode,
      error.constructor.name.replace('Error', '').toUpperCase()
    );
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    logger.warn('Validation error', {
      method,
      path,
      issues: error.issues,
    });
    
    return errorResponse(
      'Validation failed',
      400,
      'VALIDATION_ERROR',
      error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message,
      }))
    );
  }

  // Handle generic errors
  if (error instanceof Error) {
    logger.error('Unhandled error', error, { method, path });
    
    // Don't expose internal error details in production
    const message = process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : error.message;
    
    return errorResponse(message, 500, 'INTERNAL_ERROR');
  }

  // Handle unknown errors
  logger.error('Unknown error type', undefined, { method, path, error });
  return errorResponse('An unexpected error occurred', 500, 'UNKNOWN_ERROR');
}

// Helper to wrap async handlers with authentication and error handling
export function withAuth(
  handler: (request: NextRequest, userId: string, context?: any) => Promise<NextResponse>,
  requireAuth: (request: NextRequest) => Promise<{ userId: string } | NextResponse>
): RouteHandler {
  return withErrorHandler(async (request: NextRequest, context?: any) => {
    const authResult = await requireAuth(request);
    
    // If authResult is a NextResponse, it's an error response
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    
    return await handler(request, authResult.userId, context);
  });
}
