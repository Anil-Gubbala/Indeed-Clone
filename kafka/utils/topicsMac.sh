#chmod +x

#!/bin/sh

kafka-topics --create --topic request-topic1 --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic responseTopic10 --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic admin --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic Profile --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic EditCompanyName --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic EditCompanyRole --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic EditCompanyAddress --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic AddCompany --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic changeWebsite --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic changeSize --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic changeType --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic changeFounded --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic changeHeadquaters --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic changeIndustry --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic changeMission --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic changeRevenue --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic changeCEO --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic GetCompany --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic postJob --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic viewJobs --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic viewApplicants --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic setApplicationStatus --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic featured --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic empReviews --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic addCompanyId --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
kafka-topics --create --topic indeed --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1