pipeline{
    agent any
    stages{
        stage("Checkout GitHub"){
            steps{
                // git branch :'main',
                // credentialsId:'None',
                // url:'https://github.com/rajeshrj-git/invoice-generator'
                // sh'ls -lat'
                checkout scm
                echo "Checkout Done"
            }
        }
        stage("Build"){
            steps{
                echo "Buiding  here"
            }
        }
        stage('Test'){
            steps{
                echo "Testing Stage Done"
            }
        }
        
        stage('Deploy'){
            steps{
                echo "Deploying  Here"
            }
        }
    }
}
