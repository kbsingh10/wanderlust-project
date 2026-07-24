output "instance_id" {
  value = aws_instance.wanderlust.id
}

output "instance_public_ip" {
  value = aws_instance.wanderlust.public_ip
}

output "instance_public_dns" {
  value = aws_instance.wanderlust.public_dns
}

output "vpc_id" {
  value = aws_vpc.wanderlust.id
}

output "subnet_id" {
  value = aws_subnet.public.id
}

output "security_group_id" {
  value = aws_security_group.wanderlust.id
}