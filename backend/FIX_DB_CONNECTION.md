# Исправление подключения к базе данных на другом сервере

## Проблема
Docker контейнер не может подключиться к PostgreSQL на другом сервере (37.27.141.174:5432).

## Данные для подключения (из вашего сообщения):
- Host: 37.27.141.174 (или leadformdb)
- Port: 5432
- Username: lead_form_db_user (не postgres!)
- Password: zETUB;Fpnz]I1bs;}fnHc>`9Y+5|Gs9u2?bfE^%3v7<&|kKf"-
- Database: leadformdb

## Шаги для исправления:

### 1. Обновите .env файл

В файле `backend/.env` обновите данные:

```env
DB_HOST=37.27.141.174
DB_PORT=5432
DB_USERNAME=lead_form_db_user
DB_PASSWORD=zETUB;Fpnz]I1bs;}fnHc>`9Y+5|Gs9u2?bfE^%3v7<&|kKf"-
DB_DATABASE=leadformdb
DB_SYNCHRONIZE=false
```

**Важно:** Username должен быть `lead_form_db_user`, а не `postgres`!

### 2. Проверьте доступность БД с сервера

```bash
# Проверьте, доступен ли порт 5432 на удаленном сервере
telnet 37.27.141.174 5432
# или
nc -zv 37.27.141.174 5432

# Если не работает - проблема в firewall на сервере БД
```

### 3. Обновите docker-compose.yml

Добавьте `network_mode: host` чтобы контейнер использовал сеть хоста:

```yaml
version: '3.9'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: node_app
    restart: always
    network_mode: host  # Добавьте эту строку
    env_file:
      - .env
    environment:
      NODE_ENV: production
      DB_HOST: ${DB_HOST}
      DB_PORT: ${DB_PORT}
      DB_USERNAME: ${DB_USERNAME}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_DATABASE: ${DB_DATABASE}
      DB_SYNCHRONIZE: ${DB_SYNCHRONIZE}
    command: npm run start:prod
```

**Примечание:** Если используете `network_mode: host`, уберите `ports: - '9000:9000'` так как порты уже будут доступны напрямую.

### 4. Проверьте firewall на сервере БД

На сервере с БД (37.27.141.174) нужно разрешить подключения:

```bash
# На сервере БД проверьте firewall
sudo ufw status
# или
sudo firewall-cmd --list-all

# Разрешите подключения с вашего IP
sudo ufw allow from YOUR_SERVER_IP to any port 5432
```

### 5. Проверьте настройки PostgreSQL

На сервере БД в файле `/etc/postgresql/*/main/postgresql.conf`:

```conf
listen_addresses = '*'  # или конкретный IP
```

И в `/etc/postgresql/*/main/pg_hba.conf`:

```
host    all    all    YOUR_SERVER_IP/32    md5
```

### 6. Перезапустите контейнер

```bash
cd ~/rec-me/backend
docker-compose down
docker-compose up -d

# Проверьте логи
docker-compose logs -f
```

## Альтернативное решение (без network_mode: host)

Если не хотите использовать `network_mode: host`, убедитесь что:

1. Docker может обращаться к внешним IP
2. Firewall разрешает исходящие подключения на порт 5432
3. Правильные credentials в .env

## Проверка подключения

```bash
# С сервера попробуйте подключиться напрямую
psql -h 37.27.141.174 -p 5432 -U lead_form_db_user -d leadformdb

# Или через Docker контейнер
docker exec -it node_app npm run start:prod
```

