pipeline {


agent any

environment {

    APP_NAME = "cloudcart-platform"

    DOCKER_COMPOSE = "docker-compose"

    BUILD_NUMBER = "${env.BUILD_ID}"

}

options {

    timestamps()

    disableConcurrentBuilds()

}

stages {

    stage('Clean Workspace') {

        steps {

            echo 'Cleaning workspace...'

            cleanWs()

        }

    }

    stage('Clone Repository') {

        steps {

            echo 'Cloning GitHub repository...'

            git branch: 'main',
            url: 'https://github.com/srikar2803/cloudcart-microservices.git'

        }

    }

    stage('Verify Environment') {

        steps {

            sh 'docker --version'

            sh 'docker-compose --version'

            sh 'ls -la'

        }

    }

    stage('Build Docker Containers') {

        steps {

            echo 'Building Docker containers...'

            sh 'docker-compose build'

        }

    }

    stage('Stop Old Containers') {

        steps {

            echo 'Stopping old containers...'

            sh 'docker-compose down || true'

        }

    }

    stage('Deploy Application') {

        steps {

            echo 'Deploying application containers...'

            sh 'docker-compose up -d'

        }

    }

    stage('Health Check') {

        steps {

            echo 'Checking running containers...'

            sh 'docker ps'

        }

    }

    stage('API Smoke Test') {

        steps {

            echo 'Testing Product API...'

            sh '''
            curl -f http://localhost:8080/products/products?page=1&limit=5
            '''
        }

    }

}

post {

    success {

        echo 'Build and deployment successful!'

    }

    failure {

        echo 'Pipeline failed!'

    }

    always {

        echo 'Pipeline execution completed.'

    }

}


}
