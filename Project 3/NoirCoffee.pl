## Assignment: Project 3
## Author: Kyle Flynn (kyle.flynn5798@yahoo.com)
## Version: 0.10.1.2015.1
## Purpose: To build a program that continuously loops itself

use 5.1.4;
use warnings;

my ($zipCode, $customerAge, $itemsOrdered, $continueInt);

sub main() {
    
    while($continueInt == YES) {
        setZipCode();
        setCustomerAge();
        setItemsOrdered();
        printResults();
    }
}

main();

sub setZipCode() {
    print "\nWhat's the customer's zip code? ";
    chomp ($zipCode = <STDIN>);
}

sub setCustomerAge() {
    print "\nWhat's the customer's age? ";
    chomp ($customerAge = <STDIN>);
}

sub setItemsOrdered() {
    print "\nHow many items did the customer order? ";
    chomp ($itemsOrdered = <STDIN>);
}

sub printResults() {
    system("cls");
    print "Customer Age: $customerAge\n";
    print "Customer Zip Code: $zipCode\n";
    print "Customer Number of Ordered Items: $itemsOrdered\n";
}