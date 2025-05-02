pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "nisanhe/devops-cicd-project:latest"
        DOCKERHUB_USER = "nisanhe"
        DOCKERHUB_PASS = credentials('dockerhub-password')
        KUBECONFIG = "/home/YOUR_PATH/.kube/config"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/nisanhe/mid-project.git'
            }
        }

        stage('Build Docker Image and push') {
            steps {
                sh 'docker build --no-cache -t $DOCKER_IMAGE .'
                sh """
                  docker login -u "$DOCKERHUB_USER" --password-stdin
                  docker push $DOCKER_IMAGE
                """
            }
        }
        stage('Deploy to Minikube and apply service') {
            steps {
                script {
                    sh 'kubectl config use-context minikube'
                    sh 'kubectl apply -f deployment.yaml'
                    sh 'kubectl apply -f service.yaml'
                }
            }
        }
    }
}
