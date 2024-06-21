import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    try {
      const decodeToken: any = jwtDecode(token);

      if (decodeToken.role === 'admin') {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Token decoding error:', error);
      router.navigate(['admin/login']); // Navigate to login if there is an error decoding the token
      return false;
    }
  } else {
    router.navigate(['admin/login']); // Navigate to login if token is not present
    return false;
  }
};
