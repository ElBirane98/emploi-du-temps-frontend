import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { SeanceService } from '../../../core/services/seance.service';
import { EnseignantService } from '../../../core/services/enseignant.service';
import { CoursService } from '../../../core/services/cours.service';
import { SalleService } from '../../../core/services/salle.service';

@Component({
  selector: 'app-formulaire-seance',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './formulaire-seance.html',
  styleUrl: './formulaire-seance.css'
})
export class FormulaireSeanceComponent implements OnInit {
  formulaireSeance!: FormGroup;
  modeEdition = false;
  seanceId: number | null = null;
  enregistrement = false;
  succes = false;
  erreur = '';

  jours     = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
  heures    = ['07:30','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
  types     = [
    { valeur:'cours',  label:'Cours magistral' },
    { valeur:'td',     label:'Travaux Dirigés (TD)' },
    { valeur:'tp',     label:'Travaux Pratiques (TP)' },
    { valeur:'examen', label:'Examen' },
  ];
  classesDisponibles = ['M1-GDIL','L3-INFO','M2-GDIL','L2-INFO'];

  enseignants: any[] = [];
  listeCours : any[] = [];
  salles     : any[] = [];

  constructor(
    private generateurFormulaire: FormBuilder,
    private routeur: Router,
    private routeActive: ActivatedRoute,
    private serviceSeance: SeanceService,
    private serviceEnseignant: EnseignantService,
    private serviceCours: CoursService,
    private serviceSalle: SalleService
  ) {}

  ngOnInit() {
    this.formulaireSeance = this.generateurFormulaire.group({
      jour:         ['Lundi',   Validators.required],
      heure_debut:  ['08:00',   Validators.required],
      heure_fin:    ['10:00',   Validators.required],
      cours:        ['',        Validators.required],
      enseignant:   ['',        Validators.required],
      salle:        ['',        Validators.required],
      classe:       ['M1-GDIL', Validators.required],
      type:         ['cours',   Validators.required],
    });

    this.serviceEnseignant.getEnseignants().subscribe(donnees => this.enseignants = donnees);
    this.serviceCours.getCours().subscribe(donnees => this.listeCours = donnees);
    this.serviceSalle.getSalles().subscribe(donnees => this.salles = donnees.filter(salle => salle.disponible));

    const identifiant = this.routeActive.snapshot.paramMap.get('id');
    if (identifiant) {
      this.modeEdition = true;
      this.seanceId = +identifiant;
      this.serviceSeance.getSeanceById(this.seanceId).subscribe(seance => {
        if (seance) this.formulaireSeance.patchValue(seance);
      });
    }

    this.routeActive.queryParams.subscribe(parametres => {
      if (parametres['enseignant']) {
        this.formulaireSeance.patchValue({ enseignant: parametres['enseignant'] });
      }
    });
  }

  enregistrer() {
    if (this.formulaireSeance.invalid) { this.formulaireSeance.markAllAsTouched(); return; }
    this.enregistrement = true;
    this.erreur = '';

    // Simulation API — remplacer par vrai appel HTTP
    setTimeout(() => {
      this.enregistrement = false;
      this.succes = true;
      setTimeout(() => this.routeur.navigate(['/admin/grille-edt']), 1500);
    }, 900);
  }

  annuler() { this.routeur.navigate(['/admin/grille-edt']); }

  champInvalide(champ: string) {
    const controle = this.formulaireSeance.get(champ);
    return controle && controle.invalid && controle.touched;
  }
}
