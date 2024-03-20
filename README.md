![preview](./assets/ibento.png)

A viewer of historical events.

## Index

- [Features](#features)
- [Installation](#installation)
- **[Instances](#instances)**

## Features

- **lightweight**
- **responsive layout**
- **light and dark mode** support
- **asynchronous**
- strict mode JavaScript
- allows to filter events according to the four historical ages

### What does Ibento mean?

Ibento (Japanese: イベント), is a Japanese word meaning "event".

## Installation

### Prerequisites

Being a static website, Ibento only needs a small webserver such as Python's built-in: if Python is already on your system, you don't have to install anything.

### Automated (GNU/Linux only)

```bash
export XDG_DATA_HOME=${XDG_DATA_HOME-~/.local/share}
mkdir -p $XDG_DATA_HOME && cd $_
curl -LO https://github.com/hisutori/ibento/releases/latest/download/ibento.zip
unzip ibento.zip && rm ibento.zip && cd ibento
python3 -m http.server 8000
```

Open your browser and visit [http://localhost:8000](http://localhost:8000).

To start automatically the webserver at system boot, you can use a systemd unit:

```bash
export XDG_CONFIG_HOME=${XDG_CONFIG_HOME-~/.config}
mkdir -p $XDG_CONFIG_HOME/systemd/user && cd $_
{
  echo '[Unit]'
  echo "Description=Ibento's http daemon"
  echo '[Service]'
  echo 'Type=oneshot'
  echo "WorkingDirectory=$XDG_DATA_HOME/ibento"
  echo 'ExecStart=/usr/bin/python3 -m http.server 8000'
  echo '[Install]'
  echo 'WantedBy=multi-user.target'
} >> ibento.service
systemctl --user enable --now ibento.service
```

### Docker

```bash
curl -LO https://github.com/hisutori/ibento/releases/latest/download/ibento-docker.zip
unzip ibento-docker.zip && rm ibento-docker.zip
docker build -t ibento .
docker run --restart always --name ibento -d -p 8000:80 ibento
```

Open your browser and visit [http://localhost:8000](http://localhost:8000).

## Instances

| Instance | Location | HTTP3 | Cloudflare |
| -------- | :------: | :---: | :--------: |
