## Cassandra steps on AWS

```
>sudo echo “deb http://www.apache.org/dist/cassandra/debian 311x main” | sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list
echo "deb http://www.apache.org/dist/cassandra/debian 36x main" | sudo tee -a /etc/apt/sources.list.d/cassandra.sources.list

edit cassandra config on /etc/cassandra/cassandra.conf

cluster_name: ‘My Cluster'
seed_provider:
    - class_name: org.apache.cassandra.locator.SimpleSeedProvider
        - seeds: 172.31.0.236, 172.31.1.108
listen_address: 172.31.0.236
rpc_address: 0.0.0.0
endpoint_snitch: Ec2Snitch

```


## Tables

```
CREATE TABLE organization(
   uuid uuid,
   org_name text  PRIMARY KEY,
   phone text, 
   address text,
   tags list<text>,
   bills list<frozen<Bill>>
   );

CREATE TABLE user(
   email text PRIMARY KEY,
   password  text, 
   orgname text,
   savedbills list<frozen<Bill>>
);

Create table discussion(
   billId text PRIMARY KEY,
   comments list<frozen<Comment>>
);

```

## Types

```
Create TYPE Bill(
   bill_id bigint,
   Number text,
   change_hash text,
   url text,
   status_date text, 
   status text,
   last_action_date text,
   last_action text,
   title text,
   description text
);

Create type Comment(
   uuid uuid,
   commentedBy text,
   comment text
);

```

```
ALTER TABLE organization DROP bills  
ALTER TABLE organization ADD bills list<frozen<Bill>>;
TRUNCATE organization;
```
