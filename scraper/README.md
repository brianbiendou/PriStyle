# Scraper Afro-Elegance

Script Python qui télécharge toutes les images de vêtements (hommes / femmes) depuis
[afro-elegance.com](https://afro-elegance.com) et les organise par catégorie /
sous-catégorie, avec optimisation pour le web (WebP, max 1200 px de large).

## Catégories récupérées

- **Homme** : boubou, ensemble, chemise, t-shirt/dashiki
- **Femme** : boubou, robe, pantalon, ensemble

*Exclus : bijoux, décoration, accessoires, chaussures, sacs.*

## Installation

```powershell
cd scraper
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Lancement

```powershell
python scrape_afro_elegance.py
```

Les images seront enregistrées dans :

```
images/
├── homme/
│   ├── boubou/
│   ├── ensemble/
│   ├── chemise/
│   └── t-shirt-dashiki/
└── femme/
    ├── boubou/
    ├── robe/
    ├── pantalon/
    └── ensemble/
```

Chaque image est :
- convertie en **WebP** (qualité 82)
- redimensionnée si elle dépasse **1200 px** de large
- nommée `<slug-produit>-<index>.webp`

Le script est **reprenable** : les fichiers déjà présents ne sont pas re-téléchargés.
