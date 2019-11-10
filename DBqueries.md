## Database queries

```
CREATE TABLE organization(
   ord_id int PRIMARY KEY,
   org_name text,
   org_desc text,
    tags list<text>,
 bills list<frozen<Bill>>
   );

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

```

```
ALTER TABLE organization DROP bills  
ALTER TABLE organization ADD bills list<frozen<Bill>>;
```