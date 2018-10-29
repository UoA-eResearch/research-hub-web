pipeline {

    agent any

    triggers {
        pollSCM 'H/5 * * * *'
    }
  
    environment {
        DOCKER_IMAGE_NAME = 'research-hub-web'
    }
  
    stages {
        stage('Build image') {
          
            steps {
                checkout scm
                
                sh '''
                   docker-compose              \\
                     -f docker-compose.yml     \\
                     -f docker-compose.ci.yml  \\
                     build                     \\
                   '''
            }
          
        }
      
        stage('Unit test') {
          
            steps {
                sh '''
                   docker-compose                         \\
                     -f docker-compose.yml                \\
                     -f docker-compose.ci.yml             \\
                     -f docker-compose.test.yml           \\
                     run -T --rm -no-deps web             \\
                   '''
            }
          
        }

        stage('Push to registry') {
          
            steps {
              sh 'curl -I ${DOCKER_REGISTRY_URI}'
              
              sh '''
                 export VERSIONED_NAME="${DOCKER_REGISTRY_URI}/${DOCKER_IMAGE_NAME}:${BRANCH_NAME}.$(git log -1 --pretty=%h)"
                 export LATEST_NAME="${DOCKER_REGISTRY_URI}/${DOCKER_IMAGE_NAME}:${BRANCH_NAME}.latest"

                 docker image tag ${DOCKER_REGISTRY_URI}/${DOCKER_IMAGE_NAME} ${VERSIONED_NAME} # Tag branch.commit hash
                 docker image tag ${DOCKER_REGISTRY_URI}/${DOCKER_IMAGE_NAME} ${LATEST_NAME} # Tag branch.latest

                 docker push ${VERSIONED_NAME}
                 docker push ${LATEST_NAME}
                 '''
            }
          
        }
    }
}

