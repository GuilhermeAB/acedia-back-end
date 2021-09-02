#!/bin/bash

echo "Starting replica set initialize"
until mongosh --host mongodb --eval "print(\"waited for connection\")"
do
  sleep 2
done
echo "Connection finished"
echo "Creating replica set"
mongosh --host mongodb <<EOF
rs.initiate({
  "_id": "rs",
  "version": 1,
  "members": [
    {
      "_id": 0,
      "host": "mongodb:27017",
      "priority": 2
    }
  ]
}, { force: true });

rs.reconfig({
  "_id": "rs",
  "version": 1,
  "members": [
    {
      "_id": 0,
      "host": "mongodb:27017",
      "priority": 2
    }
  ]
}, { force: true });
EOF
echo "replica set created"