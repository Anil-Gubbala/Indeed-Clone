#chmod +x

#!/bin/sh

bin/kafka-topics.sh --create --topic request-topic1 --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic responseTopic10 --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic admin --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic Profile --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic EditCompanyName --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic EditCompanyRole --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic EditCompanyAddress --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic AddCompany --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic changeWebsite --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic changeSize --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic changeType --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic changeFounded --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic changeHeadquaters --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic changeIndustry --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic changeMission --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic changeRevenue --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic changeCEO --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic GetCompany --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic postJob --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic viewJobs --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic viewApplicants --bootstrap-server localhost:9092
bin/kafka-topics.sh --create --topic setApplicationStatus --bootstrap-server localhost:9092
