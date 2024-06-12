import { Routes } from '@angular/router';
import { OrigenDestinoComponent } from './paginas/origen-destino/origen-destino.component';
import { LineasComponent } from './paginas/lineas/lineas.component';
import { LineaDetalleComponent } from './paginas/linea-detalle/linea-detalle.component';
import { NoticiasComponent } from './paginas/noticias/noticias.component';
import { NoticiaExtendidaComponent } from './paginas/noticia-extendida/noticia-extendida.component';
import { IncidenciasComponent } from './paginas/incidencias/incidencias.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { LoginComponent } from './paginas/login/login.component';
import { AdminListadoComponent } from './paginas/admin-listado/admin-listado.component';
import { loginGuard } from './guards/login.guard';
import { AdminCrearComponent } from './paginas/admin-crear/admin-crear.component';
import { Error404Component } from './paginas/error404/error404.component';
import { AdminEditarComponent } from './paginas/admin-editar/admin-editar.component';
import { AdminListadoBorradasComponent } from './paginas/admin-listado-borradas/admin-listado-borradas.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'origen-destino',
        pathMatch: 'full',

    },
    {
        path: 'origen-destino',
        component: OrigenDestinoComponent,
        title: 'Origen y Destino - Bus&Co',
    },
    {
        path: 'lineas',
        component: LineasComponent,
        title: 'Líneas - Bus&Co',
    },
    {
        path: 'detalle-linea/:id',
        component: LineaDetalleComponent,
        title: 'Detalle Linea - Bus&Co',
    },
    {
        path: 'noticias',
        component: NoticiasComponent,
        title: 'Noticias - Bus&Co',
    },
    {
        path: 'noticia/:id',
        component: NoticiaExtendidaComponent,
        title: 'Noticia - Bus&Co',
    },
    {
        path: 'incidencias',
        component: IncidenciasComponent,
        title: 'Incidencias - Bus&Co',
    },
    {
        path: 'contacto',
        component: ContactoComponent,
        title: 'Contacto - Bus&Co',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Iniciar sesión - Bus&Co',
    },
    {
        path: 'admin-listado',
        component: AdminListadoComponent,
        canActivate: [loginGuard],
        title: 'Líneas - Administración - Bus&Co',
    },
    {
        path: 'admin-listado-inactivas',
        component: AdminListadoBorradasComponent,
        canActivate: [loginGuard],
        title: 'Líneas inactivas- Administración - Bus&Co',
    },
    {
        path: 'admin-crear',
        component: AdminCrearComponent,
        canActivate: [loginGuard],
        title: 'Crear línea - Administración - Bus&Co',
    },
    {
        path: 'admin-editar/:id',
        component: AdminEditarComponent,
        canActivate: [loginGuard],
        title: 'Editar línea - Administración - Bus&Co',
    },
    {
        path: '**',
        component: Error404Component,
        pathMatch: 'full',
    },
];
