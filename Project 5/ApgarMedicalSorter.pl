## Assignment: Project 5
## Author: Kyle Flynn (kyle.flynn5798@yahoo.com)
## Version: 0.10.27.2015.1
## Purpose: To build a program that sorts through two data files for Apgar Medical

use 5.1.4;
use warnings;

my @data;

use constant DATA_FILE_1_IN => "./ApgarMedicalBest.txt";
use constant DATA_FILE_2_IN => "./ApgarMedicalCushing.txt";
use constant DATA_FILE_OUT => "./ApgarMedicalCombined.txt";
use constant BIRTH_INDEX => 2;
use constant COLUMNS => 3;

sub main() {
    system("cls");
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
    open ($IN, '<', DATA_FILE_1_IN);
    while(<$IN>) {
        @tempData = split(/,/);
        for (my $i = 0; $i < COLUMNS; $i++) {
            chomp ($data[$counter][$i] = $tempData[$i]);
        }
        $counter++;
    }
    
    open ($IN, '<', DATA_FILE_2_IN);
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
    my $size = @data;
    my $tempVar = 0;
    my $didSwap = 1;
    
    while ($didSwap == 1) {
        $didSwap = 0; 
        for (my $i = 0; $i < $size; $i++) {            
            if(defined($data[$i + 1])) {
                if($data[$i +1][BIRTH_INDEX] < $data[$i][BIRTH_INDEX]) {
                    for (my $j = 0; $j < COLUMNS; $j++) {
                        $tempVar = $data[$i + 1][$j];
                        $data[$i +1][$j] = $data[$i][$j];
                        $data[$i][$j] = $tempVar;
                        $didSwap = 1;
                    }
                    $didSwap = 1;
                }   
            }           
        }
    }
}

sub printData() {
    my @yearCollection = ([],[]);
    my $size = @data;
    my $yearCount = 1;
    my $yearSize = 1;
   	
   	for (my $i = 0; $i < $size; $i++) {
        if(defined($data[$i + 1])) {
            if($data[$i][BIRTH_INDEX] == $data[$i + 1][BIRTH_INDEX]) {
            	$yearCount++;
            	$yearCollection[$yearSize][0] = $data[$i][BIRTH_INDEX];
            	$yearCollection[$yearSize][1] = $yearCount;
            } else {
            	$yearCollection[$yearSize][0] = $data[$i][BIRTH_INDEX];
            	$yearCollection[$yearSize][1] = $yearCount;
            	$yearSize++;
            	$yearCount = 1;
         		
            }            
        } else {
        	$yearSize++;
        	$yearCount = 1;
        	$yearCollection[$yearSize][0] = $data[$i][BIRTH_INDEX];
            $yearCollection[$yearSize][1] = $yearCount;
        }
   	}
    
    for(my $i = 0; $i <= $yearSize; $i++) {
    	if(defined $yearCollection[$i][0]) {
			print "Patients born in $yearCollection[$i][0]: $yearCollection[$i][1]\n";    		
    	}
    }
}

sub writeData() {
    my $OUT;
	my $size = @data;
	open ($OUT, '>', DATA_FILE_OUT);
	for (my $i = 0; $i < $size; $i++) {
		for (my $j = 0; $j < COLUMNS; $j++) {
			if ($j == COLUMNS - 1) {
				print ($OUT "$data[$i][$j]");
			} else {
				print ($OUT "$data[$i][$j],");
			}
		}
		print ($OUT "\n");
	}
	close $OUT;
    print "\nSuccessfully wrote data to " . DATA_FILE_OUT . "";
}
