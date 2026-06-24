# Système de Digitalisation de Souscription d'Assurance

Ce projet est une solution Full Stack cohérente, sécurisée et conteneurisée pour gérer le mini-parcours de souscription d'assurance d'une compagnie (Simulation de Devis, Approbation managériale et Émission de Contrat).

---

## 1. Choix Techniques & Architecture (4.1)

### Modélisation des Données
Le schéma de données respecte les règles relationnelles et les contraintes métier :
* **Client (1) <---> (N) Quote (Devis)** : Un client peut demander plusieurs devis.
* **Produit (1) <---> (N) Quote (Devis)** : Un devis concerne un produit d'assurance spécifique du catalogue.
* **Quote (Devis) (1) <---> (1) Contract (Contrat)** : Un contrat est lié à un unique devis approuvé via une contrainte `OneToOne` stricte.

### Architecture Applicative (Back-End)
Le back-end Spring Boot adopte une **Architecture en 3 couches (3-Tier)** :
* **Couche Controller (Web)** : Reçoit les requêtes HTTP, gère le routage, la sérialisation DTO et applique la validation syntaxique (`@Valid`).
* **Couche Service (Métier)** : Contient les règles métier (vérification du seuil de 10 000 €, unicité d'email, validation de statut) et gère l'aspect transactionnel (`@Transactional`).
* **Couche Repository (Données)** : Abstraite via Spring Data JPA pour communiquer avec PostgreSQL.

### Justifications Techniques
* **DTO & Mapping** : Séparation stricte entre les entités de persistence JPA (base de données) et les objets d'exposition réseau (DTO) pour éviter les fuites de données et sécuriser l'API.
* **Gestion centralisée des Exceptions** : Implémentation de `@RestControllerAdvice` pour attraper les exceptions de validation et métier, et renvoyer un objet d'erreur JSON propre avec un code HTTP approprié (ex: 422 Unprocessable Entity en cas de violation de règle métier).
* **CORS Sécurisé** : Configuration globale de la politique CORS restreinte uniquement aux origines autorisées (`http://localhost:5173` et `http://localhost:3000`) au lieu de `*`.

---

## 2. Schéma de Base de Données & Requêtes SQL (4.4)

### Script DDL (PostgreSQL)
Voici le script SQL de création des tables correspondant fidèlement aux entités JPA développées :

```sql
CREATE TABLE clients (
    id BIGSERIAL PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    telephone VARCHAR(100) NOT NULL
);

CREATE TABLE produits (
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    libelle VARCHAR(255) NOT NULL,
    type VARCHAR(100)
);

CREATE TABLE quotes (
    id BIGSERIAL PRIMARY KEY,
    client_id BIGINT REFERENCES clients(id) NOT NULL,
    produit_id BIGINT REFERENCES produits(id) NOT NULL,
    montant DECIMAL(12,2) NOT NULL,
    statut VARCHAR(50) NOT NULL,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE contracts (
    id BIGSERIAL PRIMARY KEY,
    quote_id BIGINT REFERENCES quotes(id) UNIQUE NOT NULL,
    numero_contrat VARCHAR(100) UNIQUE NOT NULL,
    date_effet DATE NOT NULL,
    statut VARCHAR(50) DEFAULT 'ACTIVE' NOT NULL
);
```

### Requêtes SQL d'évaluation

**Liste des devis en attente de validation (PENDING_MANAGER) :**
```sql
SELECT * FROM quotes WHERE statut = 'PENDING_MANAGER';
```

**Nombre de contrats par client :**
```sql
SELECT c.id, c.nom, COUNT(co.id) AS nombre_contrats
FROM clients c
LEFT JOIN quotes q ON c.id = q.client_id
LEFT JOIN contracts co ON q.id = co.quote_id
GROUP BY c.id, c.nom;
```

---

## 3. Qualité, Diagnostics & Améliorations (4.5)

### Risques Techniques Identifiés
* **Concurrence & Double Soumission** : Risque d'émettre deux contrats pour un seul devis si l'utilisateur clique deux fois rapidement. Résolu par la contrainte `UNIQUE` sur `quote_id` dans l'entité Contract.
* **Qualité des Données** : Entrée d'emails doublons ou incorrects. Résolu par une validation regex `@Email` et une vérification de l'unicité de l'email via `ClientRepository.existsByEmail` avant persistance.

### Diagnostic d'une API Lente
* **Logs & APM** : Utiliser Spring Boot Actuator ou activer le log SQL d'Hibernate pour inspecter les requêtes lentes.
* **Analyse de requêtes (N+1 Problem)** : Diagnostiquer si le chargement des relations génère trop de requêtes (résolu dans notre code par l'optimisation des relations JPA).
* **Indexation** : Ajouter des index de base de données sur les colonnes fréquemment requêtées (comme email ou statut).

### 3 Axes d'Amélioration pour la Production réelle
1. **Sécurisation par Rôles (JWT)** : Configurer Spring Security pour authentifier les utilisateurs et restreindre l'action `approveQuote` uniquement aux utilisateurs ayant le rôle `ROLE_MANAGER`.
2. **Outils de Migration (Flyway/Liquibase)** : Intégrer un outil de migration de base de données pour versionner le schéma SQL au lieu d'utiliser `ddl-auto: update`.
3. **Pipeline CI/CD** : Automatiser l'intégration et le déploiement sur un orchestrateur (Kubernetes) via des workflows GitLab ou GitHub Actions.

---

## 4. Guide de Démarrage (Comment compiler et lancer le projet)

### Option A : Lancement via Docker Compose (Recommandé)
Le projet est entièrement conteneurisé. Pour compiler, builder et lancer toute l'infrastructure (PostgreSQL + Spring Boot JRE 21 + React Vite Nginx) en une seule commande, ouvrez votre terminal à la racine du projet et exécutez :

```bash
docker-compose up --build
```
* **Frontend (React)** : http://localhost:3000
* **Backend (Spring Boot)** : http://localhost:8080
* **Swagger/OpenAPI** : http://localhost:8080/swagger-ui/index.html (Bonus documentation)

### Option B : Lancement Local (Développement)

**1. Lancement du Back-End**
Assurez-vous d'avoir JDK 21 d'installé.
```bash
cd souscription
mvn spring-boot:run
```

**2. Lancement du Front-End**
Assurez-vous d'avoir Node.js installé.
```bash
cd souscription-front
npm install
npm run dev
```
Le front-end local tourne par défaut sur : http://localhost:5173 (restreint et sécurisé via CORS).
