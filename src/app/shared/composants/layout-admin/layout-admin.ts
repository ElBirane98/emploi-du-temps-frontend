import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from '../../../core/services/authentification.service';

interface ElementMenu {
  libelle: string;
  icone: string;
  lien?: string;
  enfants?: ElementMenu[];
  estDeplie?: boolean;
}

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterOutlet],
  templateUrl: './layout-admin.html',
  styleUrl: './layout-admin.css'
})
export class LayoutAdminComponent {
  readonly annee = new Date().getFullYear();

  elementsMenu: ElementMenu[] = [
    { libelle: 'Tableau de bord', icone: 'bi-speedometer2', lien: '/admin/tableau-de-bord' },
    { libelle: 'Emploi du temps', icone: 'bi-calendar3', lien: '/admin/grille-edt' },
    {
      libelle: 'Séances', icone: 'bi-calendar-plus', estDeplie: false,
      enfants: [
        { libelle: 'Créer une séance', icone: 'bi-plus-circle', lien: '/admin/formulaire-seance' },
        { libelle: 'Liste des séances', icone: 'bi-list-ul', lien: '/admin/liste-seances' },
      ]
    },
    { libelle: 'Enseignants', icone: 'bi-person-badge', lien: '/admin/liste-enseignants' },
    { libelle: 'Cours', icone: 'bi-book-half', lien: '/admin/liste-cours' },
    { libelle: 'Salles', icone: 'bi-door-open', lien: '/admin/liste-salles' },
    { libelle: 'Classes', icone: 'bi-diagram-3', lien: '/admin/liste-classes' },
    { libelle: 'Départements', icone: 'bi-building', lien: '/admin/liste-departements' },
    { libelle: 'Filières', icone: 'bi-mortarboard', lien: '/admin/liste-filieres' },
  ];

  constructor(
    private serviceAuthentification: AuthentificationService,
    private routeur: Router
  ) {}

  get nomUtilisateur(): string {
    return 'Birane';
  }

  get initialesUtilisateur(): string {
    return 'B';
  }

  basculerSousMenu(element: ElementMenu) {
    element.estDeplie = !element.estDeplie;
  }

  deconnexion() {
    this.serviceAuthentification.deconnexion();
  }
}
