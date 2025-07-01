pipeline{
    agent any
    stages{
        stage("Checkout GitHub"){
            steps{
                git branch :'main',
                credentialsId:'None',
                url:'https://github.com/rajeshrj-git/invoice-generator'
                sh'ls -lat'
            }
        }
        stage("Build"){
            steps{
                echo "Buiding Happening here"
            }
        }
        stage('Test'){
            steps{
                echo "Testing Stage Done"
            }
        }
        
        stage('Deploy'){
            steps{
                echo "Deploying Happening Here"
            }
        }
    }
}
