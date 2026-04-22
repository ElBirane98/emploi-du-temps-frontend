import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeanceService } from '../../../core/services/seance.service';
import { EnseignantService } from '../../../core/services/enseignant.service';
import { CoursService } from '../../../core/services/cours.service';
import { SalleService } from '../../../core/services/salle.service';

@Component({
  selector: 'app-tableau-de-bord',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tableau-de-bord.html',
  styleUrl: './tableau-de-bord.css'
})
export class TableauDeBordComponent implements OnInit {
  statistiques = { seances: 0, enseignants: 0, cours: 0, salles: 0 };

  activites = [
    { titre: 'Importation des données', statut: 'ok', description: 'Fichier Excel importé avec succès', heure: 'Il y a 2h' },
    { titre: 'Génération des emplois du temps', statut: 'err', description: 'Conflit détecté sur Lundi 10h — Labo1', heure: 'Il y a 3h' },
    { titre: 'Export PDF Semaine 17', statut: 'ok', description: '6 emplois du temps exportés', heure: 'Hier 14h30' },
    { titre: 'Nouveau cours ajouté', statut: 'info', description: 'Angular et cadriciels web — Dr. Daiif', heure: 'Hier 09h00' },
    { titre: 'Modification de salle', statut: 'warn', description: 'Labo2 indisponible vendredi prochain', heure: 'Il y a 2j' },
  ];

  constructor(
    private serviceSeance: SeanceService,
    private serviceEnseignant: EnseignantService,
    private serviceCours: CoursService,
    private serviceSalle: SalleService
  ) {}

  ngOnInit() {
    this.serviceSeance.getSeances().subscribe(donnees => this.statistiques.seances = donnees.length);
    this.serviceEnseignant.getEnseignants().subscribe(donnees => this.statistiques.enseignants = donnees.length);
    this.serviceCours.getCours().subscribe(donnees => this.statistiques.cours = donnees.length);
    this.serviceSalle.getSalles().subscribe(donnees => this.statistiques.salles = donnees.length);
  }

  obtenirIconeStatut(statut: string): string {
    return { ok:'bi-check-circle-fill', err:'bi-x-circle-fill', warn:'bi-exclamation-triangle-fill', info:'bi-info-circle-fill' }[statut] || 'bi-circle';
  }
}
