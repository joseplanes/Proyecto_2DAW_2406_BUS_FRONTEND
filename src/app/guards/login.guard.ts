import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  const autenticacionService = inject(AutenticacionService);
  const router = inject(Router);
  if (autenticacionService.isLoggedIn()) {
    return true;
  }
  else {
    const urlTreeReturn = router.createUrlTree(['/login']);
    return urlTreeReturn;
    
  }
};
