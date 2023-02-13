#include <stdio.h> 
/* inclusion en tête du programme du fichier bibliothèque 
C/UNIX stdio.h 
*/ 
int somme(int, int);          /* Déclaration d'une fonction somme */ 
main() { 
       int a,b,s; 
       scanf("%d%d", &a,&b);  /* lecture des deux entiers */ 
       s = somme (a,b);       /* appel de la fonction somme */ 
       printf(" Voici leur somme : %d\n", s); 
} 

/* La fonction somme avec deux paramètres formels x et y */ 
int somme (int x, int y) { 
       return (x+y); 
}