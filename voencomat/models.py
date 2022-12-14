from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Categoriya(models.Model):
    znachenie = models.CharField(max_length=30)

    def __str__(self):
        return self.znachenie

    class Meta:
        managed = False
        db_table = 'categoriya'


class Connector(models.Model):
    id_voenkom = models.IntegerField()
    id_prizivnik = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'connector'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Komissar(models.Model):
    surname = models.CharField(max_length=30)
    name = models.CharField(max_length=30)
    patronymic = models.CharField(max_length=30)
    rang = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.surname} {self.name} {self.patronymic} '

    class Meta:
        managed = False
        db_table = 'komissar'


class Prizivniki(models.Model):
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    patronymic = models.CharField(max_length=30)
    vozrast = models.IntegerField()
    otsrochka = models.CharField(max_length=30)
    adress = models.CharField(max_length=30)
    categoriya = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'prizivniki'


class Voencomati(models.Model):
    metro = models.CharField(max_length=30)
    adress = models.CharField(max_length=80)
    name = models.CharField(max_length=40)

    class Meta:
        managed = False
        db_table = 'voencomati'


class auth(models.Model):
    username = models.TextField(max_length=30)
    email = models.TextField(max_length=60)
    password = models.TextField(max_length=60)

    class Meta:
        managed = False
        db_table = 'auth'


class cart(models.Model):
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    vozrast = models.IntegerField()
    categoriya = models.CharField(max_length=30)
    status = models.CharField(max_length=30)
    otsrochka = models.CharField(max_length=30)
    adress = models.CharField(max_length=30)
    patronymic = models.CharField(max_length=30)
    date_ozhid = models.CharField(max_length=30)
    date_proh = models.CharField(max_length=30)
    date_kon = models.CharField(max_length=30)
    date_got = models.CharField(max_length=30)
    date_nach = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'cart'


class status(models.Model):
    tek_znach = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'status'


class Otsluzhivshie(models.Model):
    name = models.CharField(max_length=30)
    surname = models.CharField(max_length=30)
    patronymic = models.CharField(max_length=30)
    vozrast = models.IntegerField()
    otsrochka = models.CharField(max_length=30)
    adress = models.CharField(max_length=30)
    categoriya = models.CharField(max_length=30)

    class Meta:
        managed = False
        db_table = 'otsluzhivshie'
