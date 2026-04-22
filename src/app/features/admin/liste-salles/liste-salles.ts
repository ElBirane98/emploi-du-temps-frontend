import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SalleService } from '../../../core/services/salle.service';
import { Salle } from '../../../core/services/salle';

@Component({
  selector: 'app-liste-salles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-salles.html',
  styleUrl: './liste-salles.css'
})
export class ListeSallesComponent implements OnInit {
  salles: Salle[] = [];
  filtre = '';
  filtreType = '';
  suppressionEnAttente: number | null = null;

  types = [
    { valeur:'amphitheatre', label:'Amphithéâtre'     },
    { valeur:'salle_cours',  label:'Salle de cours'   },
    { valeur:'labo_info',    label:'Laboratoire Info'  },
    { valeur:'labo_tp',      label:'Laboratoire TP'    },
  ];

  constructor(private serviceSalle: SalleService) {}

  ngOnInit() {
    this.serviceSalle.getSalles().subscribe(donnees => this.salles = donnees);
  }

  get sallesFiltrees(): Salle[] {
    const recherche = this.filtre.toLowerCase();
    return this.salles.filter(salle =>
      (salle.nom.toLowerCase().includes(recherche) || salle.batiment.toLowerCase().includes(recherche)) &&
      (!this.filtreType || salle.type === this.filtreType)
    );
  }

  supprimer(id: number) {
    this.salles = this.salles.filter(salle => salle.id !== id);
    this.suppressionEnAttente = null;
  }

  libelleType(type: string): string {
    return this.serviceSalle.getTypeLabel(type);
  }

  iconeType(type: string): string {
    return {
      amphitheatre: 'bi-person-video2',
      salle_cours:  'bi-building',
      labo_info:    'bi-pc-display',
      labo_tp:      'bi-wrench-adjustable'
    }[type] || 'bi-door-open';
  }

  badgeType(type: string): string {
    return { amphitheatre:'violet', salle_cours:'cours', labo_info:'td', labo_tp:'tp' }[type] || 'cours';
  }
}
