pipeline{
    agent any

    environment{
        NODE_ENV ='production'
    }
    options{
        timestamps()
    }


    stages{
        stage("Checkout"){
            steps{

                checkout scm
                echo "Checkout Done"
            }
        }
        stage("Installing dependicies"){
            steps{
                sh 'npm ci'
                echo "Installination Successfull ✅"
            }
        }
        stage("Build"){
            steps{
                sh 'npm run  build'
                echo "Buid Successfull ✅"
            }
        }
        stage('Test'){
            steps{
                sh 'npm test -- --watchAll=false'
                echo "Testing Successfull ✅"
            }
        }
        
        stage('Deploy'){
            steps{
                sh 'npm run deploy'
                echo "Deployed Successfull✅"
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

