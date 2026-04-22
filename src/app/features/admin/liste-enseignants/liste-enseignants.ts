import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EnseignantService } from '../../../core/services/enseignant.service';
import { Enseignant } from '../../../core/services/enseignant';

@Component({
  selector: 'app-liste-enseignants',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './liste-enseignants.html',
  styleUrl: './liste-enseignants.css'
})
export class ListeEnseignantsComponent implements OnInit {
  enseignants: Enseignant[] = [];
  filtre = '';
  suppressionEnAttente: number | null = null;

  constructor(private serviceEnseignant: EnseignantService) {}

  ngOnInit() {
    this.serviceEnseignant.getEnseignants().subscribe(donnees => this.enseignants = donnees);
  }

  get enseignantsFiltres(): Enseignant[] {
    const recherche = this.filtre.toLowerCase();
    return this.enseignants.filter(enseignant =>
      enseignant.nom.toLowerCase().includes(recherche) ||
      enseignant.prenom.toLowerCase().includes(recherche) ||
      enseignant.specialite.toLowerCase().includes(recherche) ||
      enseignant.departement.toLowerCase().includes(recherche)
    );
  }

  supprimer(id: number) {
    this.enseignants = this.enseignants.filter(enseignant => enseignant.id !== id);
    this.suppressionEnAttente = null;
  }

  obtenirInitiales(enseignant: Enseignant): string {
    return (enseignant.prenom[0] + enseignant.nom[0]).toUpperCase();
  }

  obtenirCouleurAvatar(id: number): string {
    const couleurs = ['#1e3a6e','#16a34a','#d97706','#7c3aed','#dc2626','#0891b2'];
    return couleurs[id % couleurs.length];
  }
}
