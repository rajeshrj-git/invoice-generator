pipeline{
    agent any

    stages{
        stage('Checkout'){
            steps{
                checkout scm
                sh '''
                git branch -v
                git log -1
                '''
                echo "Its Done✅"
            }
        }
    }
}
