import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, of, toArray } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const role = route.data['role'];

  let userRoles: any = [];
  authService.userRoles$.pipe(
    mergeMap((res: string) => of(res)),
    toArray()
  ).subscribe((roles: string[]) => {
    userRoles = roles;
  });

  const hasRole = userRoles?.some((uRole: any) => uRole.includes(role)) ?? false;

  if (!authService.isAuthenticated() || !hasRole) {
    authService.removeToken();
    authService.removeUserData();
    router.navigate(['login']);
    return false;
  }

  return true;
};
