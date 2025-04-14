// src/app/services/firebase-data.service.ts

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Define the Property interface (includes the ID)
export interface Property {
  id: string; // Document ID from Firestore
  title: string;
  price: number;
  address: string;
  description: string;
  bedrooms?: number;
  bathrooms?: number;
  imageUrl?: string;
  // Add other fields as needed
}

// Define an interface for Booking Data
export interface Booking {
  id?: string; // Optional Firestore ID
  userId: string;
  propertyId: string;
  requestedDateTime: string; // ISO String
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled'; // Example statuses
  createdAt: string; // ISO String
}

// Type for data STORED in Firestore properties collection (without ID field)
type StoredPropertyData = Omit<Property, 'id'>;
// Type for data when ADDING a new property (same as stored data)
type NewPropertyData = StoredPropertyData;


@Injectable({
  providedIn: 'root'
})
export class FirebaseDataService {

  // Collection references
  // Type the collection based on the data structure STORED in Firestore
  private propertiesCollection: AngularFirestoreCollection<StoredPropertyData>; // <-- Use StoredPropertyData
  private viewingsCollection: AngularFirestoreCollection<Booking>;

  // Inject AngularFirestore
  constructor(private afs: AngularFirestore) {
    // Initialize collection references with the stored data type
    this.propertiesCollection = afs.collection<StoredPropertyData>('properties'); // <-- Use StoredPropertyData
    this.viewingsCollection = afs.collection<Booking>('viewings');
  }

  /**
   * Gets an Observable stream of all properties from the Firestore collection.
   * Uses snapshotChanges() to retrieve both data and document ID.
   * Maps the result to the full Property interface (including ID).
   * @returns Observable<Property[]>
   */
  getProperties(): Observable<Property[]> {
    // Use snapshotChanges() to get document metadata (including ID)
    return this.propertiesCollection.snapshotChanges().pipe( // <-- Use snapshotChanges()
      map(actions => actions.map(a => {
        // Get the document data (typed as StoredPropertyData)
        const data = a.payload.doc.data();
        // Get the document ID from the metadata
        const id = a.payload.doc.id;
        // Combine the ID and data into the full Property object
        return { id, ...data }; // <-- Combine ID and data
      })),
      map(properties => {
        console.log('Fetched properties:', properties);
        return properties;
      })
      // TODO: Add error handling
    );
  }

  /**
   * Gets an Observable stream for a single property document by its ID.
   * Uses snapshotChanges() to retrieve both data and document ID.
   * Maps the result to the full Property interface (including ID).
   * @param id The document ID of the property to fetch.
   * @returns Observable<Property | undefined>
   */
  getPropertyById(id: string): Observable<Property | undefined> {
    // Use snapshotChanges() on the document reference
    return this.propertiesCollection.doc<StoredPropertyData>(id).snapshotChanges().pipe( // <-- Use snapshotChanges()
      map(action => {
        if (action.payload.exists === false) {
          // Document doesn't exist
          console.log(`Property with ID ${id} not found.`);
          return undefined;
        } else {
          // Document exists, combine data and ID
          const data = action.payload.data();
          const id = action.payload.id; // Get ID from payload
          console.log(`Fetched property by ID ${id}:`, { id, ...data });
          return { id, ...data }; // <-- Combine ID and data
        }
      })
      // TODO: Add error handling
    );
  }

  // --- Methods for Adding/Updating Data ---

  /**
   * Adds a new booking document to the 'viewings' collection.
   * @param bookingData The booking data object matching the Booking interface.
   * @returns Promise resolving with the DocumentReference of the newly created document.
   */
  addBooking(bookingData: Booking): Promise<DocumentReference<Booking>> {
    console.log('FirebaseDataService: Adding booking:', bookingData);
    return this.viewingsCollection.add(bookingData);
  }
   // The return type's generic should match the collection's type parameter
  addProperty(propertyData: NewPropertyData): Promise<DocumentReference<StoredPropertyData>> { // <-- Method definition
    console.log('FirebaseDataService: Adding property:', propertyData);
    // Now propertyData (NewPropertyData) matches the collection type (StoredPropertyData)
    return this.propertiesCollection.add(propertyData); 
  }

}
