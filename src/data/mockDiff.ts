export const initialDiff = `resource "aws_db_instance" "production" {
  identifier = "sentinel-db-prod"
- region = "us-east-1"
+ region = "af-south-1"
  engine = "postgres"
  instance_class = "db.t3.micro"
  storage_encrypted = false
}`;
