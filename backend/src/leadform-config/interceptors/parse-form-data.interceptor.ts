import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ParseFormDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    
    // Если есть поле 'data' с JSON строкой, парсим его
    if (request.body && request.body.data && typeof request.body.data === 'string') {
      try {
        const parsedData = JSON.parse(request.body.data);
        // Объединяем распарсенные данные с остальными полями form-data
        request.body = { ...parsedData, ...request.body };
        delete request.body.data;
      } catch (e) {
        // Если не JSON, оставляем как есть
      }
    }
    
    // Преобразуем строковые значения в правильные типы для form-data полей
    if (request.body) {
      // Преобразуем boolean строки в boolean
      Object.keys(request.body).forEach((key) => {
        if (request.body[key] === 'true') {
          request.body[key] = true;
        } else if (request.body[key] === 'false') {
          request.body[key] = false;
        }
        // Пустые строки для опциональных полей оставляем как есть
      });
    }
    
    return next.handle();
  }
}

