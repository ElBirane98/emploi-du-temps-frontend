import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoursService } from '../../../core/services/cours.service';
import { Cours } from '../../../core/services/cours';

@Component({
  selector: 'app-liste-cours',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-cours.html',
  styleUrl: './liste-cours.css'
})
export class ListeCoursComponent implements OnInit {
  cours: Cours[] = [];
  filtre = '';
  filtreFiliere = '';
  suppressionEnAttente: number | null = null;

  filieres: string[] = [];

  constructor(private serviceCours: CoursService) {}

  ngOnInit() {
    this.serviceCours.getCours().subscribe(donnees => {
      this.cours = donnees;
      this.filieres = [...new Set(donnees.map(cours => cours.filiere))];
    });
  }

  get coursFiltres(): Cours[] {
    const recherche = this.filtre.toLowerCase();
    return this.cours.filter(cours =>
      (cours.intitule.toLowerCase().includes(recherche) || cours.code.toLowerCase().includes(recherche)) &&
      (!this.filtreFiliere || cours.filiere === this.filtreFiliere)
    );
  }

  supprimer(id: number) {
    this.cours = this.cours.filter(cours => cours.id !== id);
    this.suppressionEnAttente = null;
  }
}
