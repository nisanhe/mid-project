# Mid-Project - Full Stack Development Course 🚀

Welcome to my **Mid-Project** for the Full Stack Development course! This React.js application demonstrates the integration of multiple features like user management, todos, and posts, showcasing key aspects of React development.

---

## **Project Overview**
This project is a dynamic web application built using **React.js** and integrates with the **JSONPlaceholder API** to fetch and manage data for:
- **Users**: Display, edit, add, and delete user information.
- **ToDos**: Manage user-specific todos, including marking them as completed.
- **Posts**: Add and display posts for a selected user.

The application is designed to provide an intuitive and user-friendly interface with a focus on functionality and interactivity.

---

## **Key Features**
1. **User Management**:
   - Search users by name or email.
   - Edit user details like name and email directly.
   - Add or delete users.
   - Display additional user data (address information) on hover.

2. **ToDos Management**:
   - View todos for the selected user.
   - Add new todos with a title.
   - Mark todos as completed or not completed.
   - Highlight users with pending (uncompleted) todos.

3. **Posts Management**:
   - View posts for the selected user.
   - Add new posts with a title and body.

4. **Responsive UI**:
   - Dynamic user selection with color-coded highlighting.
   - Hover effects for additional user data.
   - Clean, organized layout with sections for users, todos, and posts.

---

## **Technologies Used**
- **React.js**: A JavaScript library for building user interfaces.
- **CSS**: For styling and layout design.
- **JSONPlaceholder API**: Mock API for fetching users, todos, and posts.

---

## **Setup Instructions**
To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/nisanhe/mid-project.git
   cd mid-project

# My React App – CI/CD with Jenkins, Docker, and Minikube

This project demonstrates a full CI/CD pipeline: cloning the source code from GitHub, building a Docker image, pushing it to Docker Hub, and deploying it to a local Kubernetes cluster using Minikube — all automated through a Jenkins pipeline.

---

## Prerequisites

Make sure the following are installed on your local machine:

- Git
- Docker
- Minikube (with VirtualBox or another driver)
- kubectl
- Jenkins (Snap, Docker, or manual install)
- A Docker Hub account
- A Jenkins credential (Secret Text) with your Docker Hub access token

---

## Setup Steps

### 1. Start Minikube

```bash
minikube start --driver=virtualbox
```

Verify that the correct context is set:

```bash
kubectl config use-context minikube
```

### 2. Install Jenkins

Example (Snap):

```bash
sudo snap install jenkins --classic
```

Or use Docker/manual as preferred.

---

### 3. Create DockerHub Credentials in Jenkins

1. Go to `http://localhost:8080`
2. Navigate to: **Manage Jenkins → Credentials → (Global)**
3. Add a new credential:
   - **Kind**: Secret text
   - **ID**: `dockerhub-password`
   - **Secret**: your **DockerHub Access Token**

---

### 4. Jenkins Pipeline Configuration

Copy the contents of the `jenkins_project.txt` file into a new Jenkins Pipeline job (Pipeline Script).

### 5. GitHub Repo Structure

Ensure your GitHub repository includes the following:

- `Dockerfile`
- `deployment.yaml`
- All necessary React application files

---

## Run the Pipeline

Once the setup is complete, trigger a build from Jenkins (**Build Now**). The pipeline will:

1. Clone the repo
2. Build the Docker image
3. Push it to Docker Hub
4. Deploy it to Minikube using `kubectl`

---

## Access the Application

After a successful deployment, run:

```bash
minikube service my-react-app-service --url
```

This will return a local URL to access your React app in a browser.

---

## Common Issues

- ❌ `Profile "minikube" not found` – Make sure Minikube is running and the KUBECONFIG is set:

  ```bash
  export KUBECONFIG=/home/your-user/.kube/config
  ```

- ❌ Docker login fails in Jenkins – Ensure you saved the DockerHub **access token** correctly in Jenkins credentials.

---

## Author

**Nisan Hender**  
GitHub: [@nisanhe](https://github.com/nisanhe)

Contact

For any questions or feedback, feel free to reach out:

    Email: nisanhender@gmail.com
    GitHub: nisanhe
    Linkdin: Nisan Hender
