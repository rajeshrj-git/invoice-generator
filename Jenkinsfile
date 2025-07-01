pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    options {
        timestamps()
    }

    stages {
        stage("Checkout") {
            steps {
                checkout scm
                echo "Checkout Done"
            }
        }

        stage("Installing dependencies") {
            steps {
                sh 'npm ci --include=dev'  // Ensures devDependencies are installed
                echo "Installation Successful ✅"
            }
        }

        stage("Build") {
            steps {
                echo "🔨 Building React app..."
                sh 'NODE_OPTIONS=--openssl-legacy-provider npm run build'
                echo "Build Successful ✅"
            }
        }

        stage('Test') {
            steps {
                sh 'npm test -- --watchAll=false'
                echo "Testing Successful ✅"
            }
        }

        stage('Deploy') {
            steps {
                sh 'npm run deploy'
                echo "Deployed Successfully ✅"
            }
        }
    }

    post {
        success {
            echo "🎉 Pipeline executed successfully!"
        }
        failure {
            echo "❌ Pipeline failed — check logs above."
        }
    }
}