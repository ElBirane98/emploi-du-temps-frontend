import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Enseignant } from './enseignant';

const ENSEIGNANTS_MOCK: Enseignant[] = [
  { id:1,  nom:'Ba',      prenom:'Cheikh',       courriel:'c.ba@ugb.edu.sn',       specialite:'Mathématiques',           departement:'Dept. Sciences',  grade:'Doctorant',     actif:true  },
  { id:2,  nom:'Gueye',   prenom:'Abdou Khadre', courriel:'ak.gueye@ugb.edu.sn',   specialite:'Algorithmique & IA',      departement:'Dept. Info',      grade:'Docteur',       actif:true  },
  { id:3,  nom:'Deme',    prenom:'Elhadji',      courriel:'e.deme@ugb.edu.sn',     specialite:'Bases de Données',        departement:'Dept. Info',      grade:'Professeur',    actif:true  },
  { id:4,  nom:'Lo',      prenom:'Moussa',       courriel:'m.lo@ugb.edu.sn',       specialite:'Génie Logiciel',          departement:'Dept. Info',      grade:'Docteur',       actif:true  },
  { id:5,  nom:'Fall',    prenom:'Seydina',      courriel:'s.fall@ugb.edu.sn',     specialite:'Réseaux & Systèmes',      departement:'Dept. Réseaux',   grade:'Professeur',    actif:true  },
  { id:6,  nom:'Daiif',   prenom:'Aziz',         courriel:'a.daiif@ugb.edu.sn',    specialite:'Cadriciels Web',          departement:'Dept. Info',      grade:'Docteur',       actif:true  },
  { id:7,  nom:'Camara',  prenom:'Alpha',        courriel:'a.camara@ugb.edu.sn',   specialite:'Intelligence Artificielle',departement:'Dept. Info',     grade:'Doctorant',     actif:true  },
  { id:8,  nom:'Dieng',   prenom:'Fatou',        courriel:'f.dieng@ugb.edu.sn',    specialite:'Statistiques',            departement:'Dept. Sciences',  grade:'Maître-Assist.',actif:false },
  { id:9,  nom:'Mbaye',   prenom:'Cheikh',       courriel:'c.mbaye@ugb.edu.sn',    specialite:'Sécurité Informatique',   departement:'Dept. Réseaux',   grade:'Docteur',       actif:true  },
  { id:10, nom:'Ba',      prenom:'Mariama',      courriel:'m.ba@ugb.edu.sn',       specialite:'Mathématiques Discrètes', departement:'Dept. Sciences',  grade:'Maître-Assist.',actif:true  },
];

@Injectable({ providedIn: 'root' })
export class EnseignantService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getEnseignants(): Observable<Enseignant[]> {
    return this.http.get<Enseignant[]>(`${this.apiUrl}/enseignants`);
    // return of(ENSEIGNANTS_MOCK);
  }

  creerEnseignant(e: Enseignant): Observable<Enseignant> {
    return this.http.post<Enseignant>(`${this.apiUrl}/enseignants`, e);
  }

  modifierEnseignant(id: number, e: Enseignant): Observable<Enseignant> {
    return this.http.put<Enseignant>(`${this.apiUrl}/enseignants/${id}`, e);
  }

  supprimerEnseignant(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/enseignants/${id}`);
  }
}
