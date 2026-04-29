# Deploiement - fansite.azim404.com

Stack: site statique servi par `nginx:alpine` en conteneur Docker, derriere le reverse proxy Nginx hote du VPS + Certbot.

## 1) Pre-requis VPS (a faire 1 fois)

Convention infra (cf. `agent/project-context.md`):
- Hote: `azim-vps` (user `debian`, port `2222`)
- Dossier app: `/home/debian/apps/fansite`
- Port local: `127.0.0.1:3008` -> conteneur `80`
- Domaine: `fansite.azim404.com`

### a. DNS
Enregistrement `A` (et `AAAA` si IPv6) `fansite` -> IP du VPS (`51.210.244.46`).

### b. Cle SSH dediee deploiement
Sur la machine locale (ou directement en GitHub Actions au 1er deploy, peu importe), generer une cle dediee:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/fansite_deploy -C "github-actions fansite" -N ""
ssh-copy-id -i ~/.ssh/fansite_deploy.pub -p 2222 debian@azim404.com
# Ou append manuel dans /home/debian/.ssh/authorized_keys
```

Tester: `ssh -i ~/.ssh/fansite_deploy -p 2222 debian@azim404.com 'echo ok'`.

### c. Vhost Nginx hote + HTTPS
Sur le VPS:

```bash
sudo cp deploy/nginx/fansite.azim404.com.conf /etc/nginx/sites-available/fansite.azim404.com
sudo ln -s /etc/nginx/sites-available/fansite.azim404.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d fansite.azim404.com
```

### d. Premier `docker compose up`
Le workflow s'en charge automatiquement au 1er push, mais on peut amorcer manuellement:

```bash
ssh azim-vps
mkdir -p /home/debian/apps/fansite && cd /home/debian/apps/fansite
git clone https://github.com/Sofiane224434/fansite.git .
docker compose -p fansite up -d --build
curl -I http://127.0.0.1:3008
```

## 2) Configuration GitHub

### Secrets (Settings -> Secrets and variables -> Actions -> Secrets)
| Nom | Valeur |
|---|---|
| `VPS_HOST` | `azim404.com` (ou IP `51.210.244.46`) |
| `VPS_PORT` | `2222` |
| `VPS_USER` | `debian` |
| `VPS_SSH_KEY` | contenu **integral** de `~/.ssh/fansite_deploy` (cle privee, BEGIN/END inclus) |

### Variables (meme ecran, onglet Variables)
| Nom | Valeur |
|---|---|
| `VPS_APP_DIR` | `/home/debian/apps/fansite` |
| `VPS_COMPOSE_PROJECT` | `fansite` |

## 3) Cycle de deploiement

A chaque `git push` sur `main`, le workflow `.github/workflows/deploy-vps.yml`:
1. Ouvre une session SSH sur le VPS.
2. `git fetch` + `reset --hard origin/main` + `clean -fd` dans `/home/debian/apps/fansite`.
3. `docker compose -p fansite up -d --build --remove-orphans`.
4. `docker image prune -f`.
5. Smoke test public sur `https://fansite.azim404.com`.

Trigger manuel possible via l'onglet **Actions** -> **Deploy to VPS** -> *Run workflow*.

## 4) Verifications

```bash
# Container
ssh azim-vps "cd /home/debian/apps/fansite && docker compose ps"
# Local sur VPS
ssh azim-vps "curl -I http://127.0.0.1:3008"
# Public
curl -I https://fansite.azim404.com
```

## 5) Rollback rapide

```bash
ssh azim-vps
cd /home/debian/apps/fansite
git log --oneline -n 10
git reset --hard <sha-precedent>
docker compose -p fansite up -d --build
```
