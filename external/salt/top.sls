base:
  '*':
    - common
    - tuning
    - cfssl
    - docker
    - telegraf
    - hosts
  
  'role:loadgen':
    - match: grain
    - golang
  
  'role:influx':
    - match: grain
    - influxdb
    - grafana
  
  'role:web':
    - match: grain
    - nginx
