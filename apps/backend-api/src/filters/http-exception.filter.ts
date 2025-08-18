import { ArgumentsHost, Catch, ExceptionFilter, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Lida com casos específicos como /json/version e /json/list
    if (status === 404 && (request.url === '/json/version' || request.url === '/json/list')) {
      return response.status(200).json({
        statusCode: 200,
        message: 'ok',
        errors: [],
      });
    }

    console.error(`HTTP Exception: ${exception.message}`);


    let errorMessage: string | string[] = exception.message;
    let errors: string[] = [];

    // Verifica se a exceção é uma BadRequestException (geralmente do ValidationPipe)
    if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();
      // A mensagem pode ser uma string ou um array de strings
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null && 'message' in exceptionResponse) {
        errorMessage = (exceptionResponse as any).message; // Pode ser string ou string[]
        if (Array.isArray(errorMessage)) {
          errors = errorMessage; // Se for um array, atribui diretamente
          errorMessage = 'Validation failed'; // Define uma mensagem mais genérica para o nível superior
        } else if (typeof errorMessage === 'string') {
          // Se for uma string, ainda pode ser a mensagem padrão do Bad Request
          // ou uma mensagem personalizada que você jogou
          errors = [errorMessage];
        }
      }
    }

    // Se errorMessage ainda for uma string, mas não foi tratada como array, coloca em 'errors'
    if (typeof errorMessage === 'string' && errors.length === 0) {
      errors = [errorMessage];
    }

    // Filtra mensagens vazias ou nulas
    errors = errors.filter(Boolean);

    return response
      .status(status)
      .json({
        statusCode: status,
        message: errorMessage, // Pode ser a mensagem genérica ou a última mensagem se for array
        path: request.url,
        error: exception.name,
        errors: errors, // Inclui o array de erros detalhados
      });
  }
}