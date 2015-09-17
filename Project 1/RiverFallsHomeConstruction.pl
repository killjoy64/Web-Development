## Assignment: Project 1
## Author: Kyle Flynn (kyle.flynn5798@yahoo.com)
## Version: 0.9.16.2015.1
## Purpose: To build a program that 

use 5.1.4;
use warnings;

my ($lotNumber, $qtyBedrooms, $qtyBathrooms, $qtyCars);

use constant BASE_PRICE => 50000;
use constant BEDROOM_PRICE => 17000;
use constant BATHROOM_PRICE => 12500;
use constant CAR_SLOT_PRICE => 6000;
use constant DOLLAR_SIGN => '$';

sub main() {
    askForLotNumber();
    askForQtyBedrooms();
    askForQtyBathrooms();
    askForQtyCars();
    printResults();
}

main();

sub askForLotNumber() {
    print "Welcome to the River Falls Homes Construction Company!\n\n";
    print "What lot do you request? ";
    chomp ($lotNumber = <STDIN>);
}

sub askForQtyBedrooms() {
    print "\nHow many bedrooms do you request? ";
    chomp ($qtyBedrooms = <STDIN>);
}

sub askForQtyBathrooms() {
    print "\nHow many bathrooms do you request? ";
    chomp ($qtyBathrooms = <STDIN>);
}

sub askForQtyCars() {
    print "\nHow many cars do you plan on storing in your garage? ";
    chomp ($qtyCars  = <STDIN>);
}

sub printResults() {
    my $finalBedrooomPrice = BEDROOM_PRICE * $qtyBedrooms;
    my $finalBathroomPrice = BATHROOM_PRICE * $qtyBathrooms;
    my $finalGaragePrice = CAR_SLOT_PRICE * $qtyCars;
    
    my $finalHomePrice = BASE_PRICE + $finalBathroomPrice + $finalBedrooomPrice + $finalGaragePrice;
    
    print "\nThe total price of lot $lotNumber is " . DOLLAR_SIGN ."$finalHomePrice \n\n";
    
    disco();
}

sub disco() {
    system("color a");
    sleep 1;
    system("color b");
    sleep 1;
    system("color d");
    sleep 1;
    system("color e");
    sleep 1;
    system("color f");
    sleep 1;
    system("color 1");
    sleep 1;
    system("color 2");
    sleep 1;
    system("color 3");
    sleep 1;
    system("color 4");
    sleep 1;
    system("color 5");
    sleep 1;
    system("color 6");
    sleep 1;
    system("color f");
    sleep 1;
}