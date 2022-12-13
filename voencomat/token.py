from rest_framework.authtoken.models import Token

token = Token.objects.create(user=qwerty)
print(token.key)
