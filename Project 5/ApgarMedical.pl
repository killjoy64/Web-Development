## Assignment: Project 5
## Author: Kyle Flynn (kyle.flynn5798@yahoo.com)
## Version: 0.10.27.2015.1
## Purpose: To build a program that sorts through two data files for Apgar Medical

use 5.1.4;
use warnings;

my @data;

use constant DATA_FILE_IN => "./Data/ApgarMedicalBest.txt";
use constant DATA_FILE_OUT => "./Data/[New]ApgarMedical";
use constant COLUMNS => 3;

sub main() {
    readData();
    printData();
    writeData();
}

main();

sub readData() {
    my $IN;
    my $counter = 0;
    my @tempData = ();
    @data = ();
    open($IN, '<', DATA_FILE_IN);
    while(<$IN>) {
        @tempData = split(/,/);
        for (my $i = 0; $i < COLUMNS; $i++) {
            chomp ($data[$counter][$i] = $tempData[$i]);
        }
        $counter++;
    }
    close $IN;
    modifyData();
}

sub modifyData() {
    
}

sub printData() {
    my $size = @data;
    for (my $i = 0; $i < $size; $i++) {
        for (my $j = 0; $j < COLUMNS; $j++) {
            print "$data[$i][$j]\n";
        }
    }
}

sub writeData() {
    
}