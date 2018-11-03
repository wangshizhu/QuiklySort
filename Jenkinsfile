Jenkinsfile (Declarative Pipeline)
pipeline {
    agent {
        label 'Production'
    }

    stages {
        stage('checkout'){
            checkout scm
        }
        stage('Build') {
            steps {
                echo 'Building..'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}