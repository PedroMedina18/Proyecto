from django.urls import path
from .views import Inscripcion_views, Generos_views, AñosEscolarizacion_views, Parentescos_views, Representante_views, AñoInscripsion_views, Login

urlpatterns=[
    path('generos/', Generos_views.as_view(), name='generos'),
    # path('profesiones/', Profesiones_views.as_view(), name='profesiones'),
    path('parentescos/', Parentescos_views.as_view(), name='parentescos'),
    path('años_escolarizacion/', AñosEscolarizacion_views.as_view(), name='años'),
    # path('padecimientos/', Padecimientos_views.as_view(), name='padecimientos'),
    path('inscripciones/', Inscripcion_views.as_view(), name='inscripciones'),
    path('representantes/', Representante_views.as_view(), name='representantes_list'),
    path('representantes/<str:identificador>/', Representante_views.as_view(), name='representantes'),
    path('login/', Login.as_view(), name='login'),
    path('año_inscripcion/<int:id_añoEscolarizacion>/', AñoInscripsion_views.as_view(), name='año_inscripcion'),

]