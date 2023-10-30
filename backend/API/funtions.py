
# funcion utilizada para determinar si se dio un numero o un string
def determinar_valor(argumento):
    try:
        numero=int(argumento)
        return {"type":"int", "valor":numero}
    except ValueError:
        string=argumento
        return {"type":"str", "valor":string}

# funcion utilizada cuando se busca representante para generar el string a buscar
def edit_str(input_str):
    # Convertir la cadena de entrada a minúsculas.
    input_str = input_str.lower()
    # Elimina todos los espacios de la cadena de entrada.
    input_str = input_str.replace(" ", "_")
    # Dividir la cadena de entrada en una lista de palabras.
    words = input_str.split("_")
    # Crea una nueva lista para almacenar las palabras editadas.
    edited_words = []
    # Iterar sobre la lista de palabras.
    for word in words:
        # agréguela a la lista de palabras editadas con un signo "%" a cada lado.
        edited_words.append("%" + word + "%")
    # Unir la lista de palabras editadas en una sola cadena.
    edited_str = "_".join(edited_words)
    # Devuelve la cadena editada.
    return edited_str

# esta funcion crear un array separando los elementos de un string en cada ,
def crear_array(string):
    lista = string.split(",")
    lista = [int(x) for x in lista]
    return(lista)

def antecedores(num):
    if num <= 1:
        return None
    resultados = []
    for i in range(1, num):
        resultados.append(i)
    return resultados