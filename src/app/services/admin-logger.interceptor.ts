import { HttpInterceptorFn } from '@angular/common/http';

export const adminLoggerInterceptor: HttpInterceptorFn = (req, next) => {
 // console.log('requesting', req.url);
  const token = localStorage.getItem('token')
 // console.log("token:",token);
  const authReq = req.clone({
    headers:req.headers.set('Authorization', `Bearer ${token}`)
  })
  return next(authReq);
};
