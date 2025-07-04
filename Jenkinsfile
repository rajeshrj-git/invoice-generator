pipeline{
    agent any 
    stages{
        stage('Checkout'){
            steps{
                git branch: 'main', credentialsId: 'd4987ab6-ff01-47d0-9a42-624c138d77e5', url: 'https://github.com/rajeshrj-git/invoice-generator'  
                echo 'Github Checkout Done'            }
        }
        stage('Build Docker image'){
            steps{
                sh'sudo docker build -t invoice-generator:2.1'
            }
        }
        stage('Docker Hub pushing'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'docker_pass', usernameVariable: 'docker_user')]) {
                sh'docker login -u ${docker_user} -p ${docker_pass}'
}
               sh'sudo docker push rajeshchoco13/invoice-generator:2.1'


            }
        }
        stage('K8 Deploy'){
            steps{
                sh '''kubectl get pods
                kubectl set image deplpoyment invoice-generator invoice-generator:rajeshchoco13/invoice-generator:2.1 '''

            }
        }
    }
}

