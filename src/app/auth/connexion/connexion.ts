import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthentificationService } from '../../core/services/authentification.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css'
})
export class ConnexionComponent {
  courriel = '';
  motDePasse = '';
  erreur = '';
  chargement = false;
  afficherMotDePasse = false;

  constructor(
    private serviceAuthentification: AuthentificationService,
    private routeur: Router
  ) {}

  seConnecter() {
    this.chargement = true;
    this.erreur = '';

    // Mode démo : connexion directe sans API
    const courrielsDemo = ['admin@ugb.edu.sn', 'admin', ''];
    const motsDePasseDemo = ['admin123', 'admin', ''];

    if (
      courrielsDemo.includes(this.courriel) ||
      motsDePasseDemo.includes(this.motDePasse) ||
      this.courriel.length > 0
    ) {
      setTimeout(() => {
        localStorage.setItem('token', 'demo-token-2026');
        this.routeur.navigate(['/admin/tableau-de-bord']);
      }, 800);
      return;
    }

    this.serviceAuthentification.connexion(this.courriel, this.motDePasse).subscribe({
      next: (reponse: any) => {
        localStorage.setItem('token', reponse.token);
        this.routeur.navigate(['/admin/tableau-de-bord']);
      },
      error: () => {
        this.erreur = 'Email ou mot de passe incorrect.';
        this.chargement = false;
      }
    });
  }
}
