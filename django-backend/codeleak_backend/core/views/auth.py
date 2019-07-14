from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_auth.registration.views import SocialLoginView
from rest_framework.authentication import TokenAuthentication
from rest_auth.registration.views import LoginView, VerifyEmailView

class LoginViewCustom(LoginView):
    pass 

class VerifyEmailViewCustom(VerifyEmailView):
    authentication_classes = (TokenAuthentication,)

class GithubLoginView(SocialLoginView):
    adapter_class = GitHubOAuth2Adapter
    callback_url = 'http://localhost:8000/rest-auth/github/login/callback'
    client_class = OAuth2Client