pipeline{
    agent any 
    stages{
        stage('Checkout'){
            steps{
                git branch: 'main', url: 'https://github.com/rajeshrj-git/invoice-generator'  
                echo 'Github Checkout Done✅'            }
        }
        stage('Build Docker image'){
            steps{
                sh'docker build -t rajeshchoco13/invoice-generator:2.1  .'
                echo 'Buil image Done ✅'
            }
        }
        stage('Docker Hub pushing'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'docker_pass', usernameVariable: 'docker_user')]) {
                sh'docker login -u ${docker_user} -p ${docker_pass}'
}
               sh'docker push rajeshchoco13/invoice-generator:2.1 '
                echo 'Docker Hub Push Done ✅'


            }
        }
        stage('K8 Deploy'){
            steps{
                sh '''kubectl get pods -A
                kubectl set image deplpoyment invoice-generator invoice-generator:rajeshchoco13/invoice-generator:2.1 '''
                echo "Deployment using Kubeis Done ✅"
                

            }
        }
    }
}

